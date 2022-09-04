import debounce from 'debounce'

export default function({options, store}) {
	if (options.debounce) {
		const debouncedActions = {}

		for (const action in options.debounce) {
			debouncedActions[action] = debounce(store[action], options.debounce[action])
		}

		return debouncedActions
	}
}
