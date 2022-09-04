import {isAsyncFunction} from '@snickbit/utilities'
import {ref} from 'vue'

export type AsyncFunction<T> = (...args: any[]) => Promise<T>

export default function({store}) {
	const _loading = ref([])

	for (const [key, prop] of Object.entries(store)) {
		if (isAsyncFunction(prop)) {
			store[key] = async function(...args) {
				const promise = (prop as AsyncFunction<any>).call(this, ...args)
				_loading.value.push(promise)
				return await promise.finally(() => _loading.value.splice(_loading.value.indexOf(promise), 1))
			}
		}
	}

	const isLoading = () => _loading.value.length > 0

	return {
		async ready() {
			await Promise.all(_loading.value)
		},
		_loading,
		isLoading
	}
}
