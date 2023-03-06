export const runtimeTypeCheck = (value: any) => {
	switch (typeof value) {
		case 'object':
			switch (Object.prototype.toString.call(value)) {
				case '[object Array]':
					return 'array';
				default:
					return 'object';
			}
		case 'string':
			if (Number.isNaN(Date.parse(value))) return 'string';
			else return 'date';
		default:
			return typeof value;
	}
}