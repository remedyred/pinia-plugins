import out from '@snickbit/out'
import {clone, isCallable} from '@snickbit/utilities'

export default function ({options, store}) {
	if (options.init && isCallable(store[options.init])) {
		out.debug('[Pinia] Initializing store...', clone(store))
		try {
			store[options.init]()
		} catch (e) {
			console.error('Error initializing store', e)
		}
	}
}
