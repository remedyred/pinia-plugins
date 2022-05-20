import {isEmpty, isObject, objectExcept, objectOnly} from '@snickbit/utilities'
import localforage from 'localforage'
import {Store} from 'pinia'

export interface PersistenceObject {
	storageKey?: string
	include?: string[]
	ignore?: string[]
}

export type PersistenceArray = string[]

export interface PersistenceOptions {
	persist: PersistenceObject | PersistenceArray | boolean
}

export interface PersistenceParams {
	options: PersistenceOptions
	store: Store
}

export default async function ({options, store}: PersistenceParams): Promise<void> {
	if (options.persist) {
		if (options.persist === true) options.persist = {}
		else if (Array.isArray(options.persist)) options.persist = {include: options.persist}
		else if (!isObject(options.persist)) throw new Error('Invalid persist options')

		const config = {
			storageKey: store.$id,
			include: [],
			ignore: [],
			...options.persist
		}

		const updateStorage = async () => {
			let state = JSON.parse(JSON.stringify(store.$state))
			if (!isEmpty(config.include)) {
				state = objectOnly(state, config.include)
			}
			if (!isEmpty(config.ignore)) {
				state = objectExcept(state, config.ignore)
			}
			await localforage.setItem(config.storageKey, state)
		}

		localforage.getItem(config.storageKey).then(store.$patch).catch(() => {
			console.warn(`[Persist] Failed to load state from storage`)
		})
		await updateStorage()
		store.$subscribe(() => updateStorage())
	}
}
