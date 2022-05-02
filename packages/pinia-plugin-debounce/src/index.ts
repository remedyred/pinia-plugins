import debounce from 'debounce'

export default function ({options, store}) {
	if (options.debounce) {
		// we are overriding the actions with new ones
		return Object.keys(options.debounce).reduce((debouncedActions, action) => {
			debouncedActions[action] = debounce(
				store[action],
				options.debounce[action]
			)
			return debouncedActions
		}, {})
	}
}
