# @snickbit/pinia-plugin-loading

## Table of contents

### Type Aliases

- [AsyncFunction](README.md#asyncfunction)

### Functions

- [default](README.md#default)

## Type Aliases

### AsyncFunction

Ƭ **AsyncFunction**<`T`\>: (...`args`: `any`[]) => `Promise`<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

▸ (...`args`): `Promise`<`T`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `any`[] |

##### Returns

`Promise`<`T`\>

## Functions

### default

▸ **default**(`__namedParameters`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `_loading` | `Ref`<`any`[]\> |
| `isLoading` | () => `boolean` |
| `ready` | () => `Promise`<`void`\> |
