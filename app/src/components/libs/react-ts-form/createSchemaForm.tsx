import type {
  ForwardRefExoticComponent,
  ReactNode,
  RefAttributes,
} from "react";
import React, { Fragment, useRef } from "react";
import type { ComponentProps } from "react";
import type { ErrorOption, UseFormReturn } from "react-hook-form";
import { FormProvider, useForm } from "react-hook-form";
import type { AnyZodObject, z, ZodEffects } from "zod";
import { getComponentForZodType } from "./getComponentForZodType";
import { zodResolver } from "@hookform/resolvers/zod";
import type {
  IndexOf,
  IndexOfUnwrapZodType,
  RequireKeysWithRequiredChildren,
  UnwrapMapping,
} from "./typeUtilities";
import {
  getMetaInformationForZodType,
  parseDescription,
} from "./getMetaInformationForZodType";
import { unwrapEffects } from "./unwrap";
import type { RTFBaseZodType, RTFSupportedZodTypes } from "./supportedZodTypes";
import { FieldContextProvider } from "./FieldContext";
import { isZodTypeEqual } from "./isZodTypeEqual";
import { duplicateTypeError, printWarningsForSchema } from "./logging";
import {
  duplicateIdErrorMessage,
  HIDDEN_ID_PROPERTY,
  isSchemaWithHiddenProperties,
} from "./createFieldSchema";
import { ZodNullable, ZodNullableType } from "zod/lib/types";
import { NestedValue } from "react-hook-form/dist/types/form";
import { BrowserNativeObject } from "react-hook-form/dist/types/utils";

/**
 * @internal
 */
export type ReactProps = Record<string, any>;

/**
 * @internal
 */
export type ReactComponentWithRequiredProps<
  Props extends ReactProps
  // ExtraProps extends Record<string, any> = {}
> =
  | ((props: Props) => JSX.Element)
  | (ForwardRefExoticComponent<Props> & RefAttributes<unknown>);

export type MappingItem<PropType extends ReactProps> = readonly [
  RTFBaseZodType,
  ReactComponentWithRequiredProps<PropType>
];

export type FormComponentMapping = readonly MappingItem<any>[];
export type MappableProp =
  | "control"
  | "name"
  | "enumValues"
  | "descriptionLabel"
  | "descriptionPlaceholder";
export type PropsMapping = readonly (readonly [MappableProp, string])[];

export function noMatchingSchemaErrorMessage(
  propertyName: string,
  propertyType: string
) {
  return `No matching zod schema for type \`${propertyType}\` found in mapping for property \`${propertyName}\`. Make sure there's a matching zod schema for every property in your schema.`;
}

export function useFormResultValueChangedErrorMesssage() {
  return `useFormResult prop changed - its value shouldn't changed during the lifetime of the component.`;
}

/**
 * @internal
 */
type FormComponent = "form" | ((props: any) => JSX.Element);

export type ExtraProps = {
  /**
   * An element to render before the field.
   */
  beforeElement?: ReactNode;
  /**
   * An element to render after the field.
   */
  afterElement?: ReactNode;
};

/**
 * @internal
 */
type UnwrapEffects<T extends AnyZodObject | ZodEffects<any, any>> =
  T extends AnyZodObject
    ? T
    : T extends ZodEffects<infer EffectsSchema, any>
    ? EffectsSchema extends ZodEffects<infer EffectsSchemaInner, any>
      ? EffectsSchemaInner
      : EffectsSchema
    : never;

// Muly
type UnwrapEffectsNULL<T extends AnyZodObject | ZodEffects<any, any>> =
  T extends AnyZodObject
    ? ZodNullableType<T>
    : T extends ZodEffects<infer EffectsSchema, any>
    ? EffectsSchema extends ZodEffects<infer EffectsSchemaInner, any>
      ? ZodNullableType<EffectsSchemaInner>
      : ZodNullableType<EffectsSchema>
    : never;

// copy from app/node_modules/react-hook-form/dist/types/utils.d.ts
// DeepPartial allow null in defaultValues also when not allowed in schema
type DeepPartialMULY<T> = T extends BrowserNativeObject | NestedValue
  ? T
  : {
      [K in keyof T]?: DeepPartialMULY<T[K] | null>;
    };

function checkForDuplicateTypes(array: RTFSupportedZodTypes[]) {
  const combinations = array.flatMap((v, i) =>
    array.slice(i + 1).map((w) => [v, w] as const)
  );
  for (const [a, b] of combinations) {
    printWarningsForSchema(a);
    printWarningsForSchema(b);
    if (isZodTypeEqual(a, b)) {
      duplicateTypeError();
    }
  }
}

function checkForDuplicateUniqueFields(array: RTFSupportedZodTypes[]) {
  const usedIdsSet = new Set<string>();
  for (const type of array) {
    if (isSchemaWithHiddenProperties(type)) {
      if (usedIdsSet.has(type._def[HIDDEN_ID_PROPERTY]))
        throw new Error(duplicateIdErrorMessage(type._def[HIDDEN_ID_PROPERTY]));
      usedIdsSet.add(type._def[HIDDEN_ID_PROPERTY]);
    }
  }
}

const defaultPropsMap = [
  ["name", "name"] as const,
  ["control", "control"] as const,
  ["enumValues", "enumValues"] as const,
] as const;

function propsMapToObect(propsMap: PropsMapping) {
  const r: { [key in MappableProp]+?: string } = {};
  for (const [mappable, toProp] of propsMap) {
    r[mappable] = toProp;
  }
  return r;
}

/**
 * Creates a reusable, typesafe form component based on a zod-component mapping.
 * @example
 * ```tsx
 * const mapping = [
 *  [z.string, TextField] as const
 * ] as const
 * const MyForm = createTsForm(mapping)
 * ```
 * @param componentMap A zod-component mapping. An array of 2-tuples where the first element is a zod schema and the second element is a React Functional Component.
 * @param options Optional - A custom form component to use as the container for the input fields.
 */
export function createTsForm<
  Mapping extends FormComponentMapping,
  PropsMapType extends PropsMapping = typeof defaultPropsMap,
  FormType extends FormComponent = "form"
>(
  /**
   * An array mapping zod schemas to components.
   * @example
   * ```tsx
   * const mapping = [
   *  [z.string(), TextField] as const
   *  [z.boolean(), CheckBoxField] as const
   * ] as const
   *
   * const MyForm = createTsForm(mapping);
   * ```
   */
  componentMap: Mapping,
  /**
   * Options to customize your form.
   */
  options?: {
    /**
     * The component to wrap your fields in. By default, it is a `<form/>`.
     * @example
     * ```tsx
     * function MyCustomFormContainer({children, onSubmit}:{children: ReactNode, onSubmit: ()=>void}) {
     *  return (
     *    <form onSubmit={onSubmit}>
     *      {children}
     *      <button>Submit</button>
     *    </form>
     *  )
     * }
     * const MyForm = createTsForm(mapping, {
     *  FormComponent: MyCustomFormContainer
     * })
     * ```
     */
    FormComponent?: FormType;
    /**
     * Modify which props the form control and such get passed to when rendering components. This can make it easier to integrate existing
     * components with `@ts-react/form` or modify its behavior. The values of the object are the names of the props to forward the corresponding
     * data to.
     * @default {
     *  name: "name",
     *  control: "control",
     *  enumValues: "enumValues",
     * }
     * @example
     * ```tsx
     * function MyTextField({someControlProp}:{someControlProp: Control<any>}) {
     *  //...
     * }
     *
     * const createTsForm(mapping, {
     *  propsMap: {
     *    control: "someControlProp"
     *  }
     * })
     * ```
     */
    propsMap?: PropsMapType;
  }
) {
  if (!options?.FormComponent) {
    throw new Error("Missing FormComponent");
  }
  const ActualFormComponent = options?.FormComponent;
  const schemas = componentMap.map((e) => e[0]);
  checkForDuplicateTypes(schemas);
  checkForDuplicateUniqueFields(schemas);
  const propsMap = propsMapToObect(
    options?.propsMap ? options.propsMap : defaultPropsMap
  );
  return function Component<
    SchemaType extends z.AnyZodObject | ZodEffects<any, any>
  >({
    schema,
    onSubmit,
    props,
    formProps,
    defaultValues,
    renderAfter,
    renderBefore,
    form,
  }: {
    /**
     * A Zod Schema - An input field will be rendered for each property in the schema, based on the mapping passed to `createTsForm`
     */
    schema: SchemaType;
    /**
     * A callback function that will be called with the data once the form has been submitted and validated successfully.
     */
    onSubmit: (values: z.infer<SchemaType>) => void;
    /**
     * Initializes your form with default values. Is a deep partial, so all properties and nested properties are optional.
     */
    defaultValues?:
      | DeepPartialMULY<z.infer<UnwrapEffects<SchemaType>>>
      | null // MULY
      | undefined; // MULY
    /**
     * A function that renders components after the form, the function is passed a `submit` function that can be used to trigger
     * form submission.
     * @example
     * ```tsx
     * <Form
     *   // ...
     *   renderAfter={({submit})=><button onClick={submit}>Submit</button>}
     * />
     * ```
     */
    renderAfter?: (vars: { submit: () => void }) => ReactNode;
    /**
     * A function that renders components before the form, the function is passed a `submit` function that can be used to trigger
     * form submission.
     * @example
     * ```tsx
     * <Form
     *   // ...
     *   renderBefore={({submit})=><button onClick={submit}>Submit</button>}
     * />
     * ```
     */
    renderBefore?: (vars: { submit: () => void }) => ReactNode;
    /**
     * Use this if you need access to the `react-hook-form` useForm() in the component containing the form component (if you need access to any of its other properties.)
     * This will give you full control over you form state (in case you need check if it's dirty or reset it or anything.)
     * @example
     * ```tsx
     * function Component() {
     *   const form = useForm();
     *   return <MyForm useFormResult={form}/>
     * }
     * ```
     */
    form?: UseFormReturn<z.infer<SchemaType>>;
  } & RequireKeysWithRequiredChildren<{
    /**
     * Props to pass to the individual form components. The keys of `props` will be the names of your form properties in the form schema, and they will
     * be typesafe to the form components in the mapping passed to `createTsForm`. If any of the rendered form components have required props, this is required.
     * @example
     * ```tsx
     * <MyForm
     *  schema={z.object({field: z.string()})}
     *  props={{
     *    field: {
     *      // TextField props
     *    }
     *  }}
     * />
     * ```
     */
    props?: RequireKeysWithRequiredChildren<
      Partial<{
        [key in keyof z.infer<UnwrapEffects<SchemaType>>]: Mapping[IndexOf<
          UnwrapMapping<Mapping>,
          readonly [
            IndexOfUnwrapZodType<
              ReturnType<UnwrapEffects<SchemaType>["_def"]["shape"]>[key]
            >,
            any
          ]
        >] extends readonly [any, any] // I guess this tells typescript it has a second element? errors without this check.
          ? Omit<
              ComponentProps<
                Mapping[IndexOf<
                  UnwrapMapping<Mapping>,
                  readonly [
                    IndexOfUnwrapZodType<
                      ReturnType<
                        UnwrapEffects<SchemaType>["_def"]["shape"]
                      >[key]
                    >,
                    any
                  ]
                >][1]
              >,
              PropsMapType[number][1]
            > &
              ExtraProps
          : never;
      }>
    >;
  }> &
    RequireKeysWithRequiredChildren<{
      /**
       * Props to pass to the form container component (by default the props that "form" tags accept)
       */
      formProps?: Omit<ComponentProps<FormType>, "children" | "onSubmit">;
    }>) {
    const useFormResultInitialValue = useRef<
      undefined | ReturnType<typeof useForm>
    >(form);
    if (!!useFormResultInitialValue.current !== !!form) {
      throw new Error(useFormResultValueChangedErrorMesssage());
    }
    const resolver = zodResolver(schema);

    const _form = (() => {
      if (form) return form;

      console.log(`muly:FORM:defaultValues`, { defaultValues });

      const uf = useForm({
        resolver,
        // Muly
        defaultValues: defaultValues || undefined,
      });
      return uf;
    })();
    const { control, handleSubmit, setError } = _form;
    const _schema = unwrapEffects(schema);
    const shape: Record<string, RTFSupportedZodTypes> = _schema._def.shape();

    const propsDesc = parseDescription(_schema.description);
    console.log(`muly:Component:createSchemaForm`, {
      _schema,
      shape,
      propsDesc,
    });

    const coerceUndefinedFieldsRef = useRef<Set<string>>(new Set());

    function addToCoerceUndefined(fieldName: string) {
      coerceUndefinedFieldsRef.current.add(fieldName);
    }

    function removeFromCoerceUndefined(fieldName: string) {
      coerceUndefinedFieldsRef.current.delete(fieldName);
    }

    function removeUndefined(data: any) {
      const r = { ...data };
      // @ts-ignore
      for (const undefinedField of coerceUndefinedFieldsRef.current) {
        delete r[undefinedField];
      }
      return r;
    }

    function _submit(data: z.infer<SchemaType>) {
      resolver(removeUndefined(data), {} as any, {} as any).then((e) => {
        const errorKeys = Object.keys(e.errors);
        if (!errorKeys.length) {
          onSubmit(data);
          return;
        }
        for (const key of errorKeys) {
          setError(
            key as any,
            (e.errors as any)[key] as unknown as ErrorOption
          );
        }
      });
    }
    const submitFn = handleSubmit(_submit);

    return (
      <FormProvider {..._form}>
        {/* @ts-ignore */}
        <ActualFormComponent {...propsDesc} {...formProps} onSubmit={submitFn}>
          {renderBefore && renderBefore({ submit: submitFn })}
          {Object.keys(shape).map((key) => {
            const type = shape[key] as RTFSupportedZodTypes;
            const Component = getComponentForZodType(type, componentMap);
            if (!Component) {
              throw new Error(
                noMatchingSchemaErrorMessage(key, type._def.typeName)
              );
            }
            const meta = getMetaInformationForZodType(type);

            const fieldProps = props && props[key] ? (props[key] as any) : {};

            const { beforeElement, afterElement } = fieldProps;

            const mergedProps = {
              ...(propsMap.name && { [propsMap.name]: key }),
              ...(propsMap.control && { [propsMap.control]: control }),
              ...(propsMap.enumValues && {
                [propsMap.enumValues]: meta.enumValues,
              }),
              ...(propsMap.descriptionLabel && {
                [propsMap.descriptionLabel]: meta.description?.label,
              }),
              ...(propsMap.descriptionPlaceholder && {
                [propsMap.descriptionPlaceholder]:
                  meta.description?.placeholder,
              }),
              ...fieldProps,
            };

            // const ctxLabel = meta.description?.label;
            // const ctxPlaceholder = meta.description?.placeholder;
            return (
              <Fragment key={key}>
                {beforeElement}
                <FieldContextProvider
                  control={control}
                  name={key}
                  description={meta.description}
                  // label={ctxLabel}
                  // placeholder={ctxPlaceholder}
                  enumValues={meta.enumValues as string[] | undefined}
                  addToCoerceUndefined={addToCoerceUndefined}
                  removeFromCoerceUndefined={removeFromCoerceUndefined}
                >
                  <Component key={key} {...mergedProps} />
                </FieldContextProvider>
                {afterElement}
              </Fragment>
            );
          })}
          {renderAfter && renderAfter({ submit: submitFn })}
        </ActualFormComponent>
      </FormProvider>
    );
  };
}
