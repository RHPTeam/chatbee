module.exports = {
	removeDuplicates: arr => {
		return arr.filter((v,i) => arr.indexOf(v) === i)
	}
}