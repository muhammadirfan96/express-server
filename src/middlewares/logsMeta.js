const logsMeta = async (req, res, next) => {
	const userId = req.uid;
	const userIp = req.ip;
	const httpRequestInfo = {
		method: req.method,
		url: req.originalUrl,
		headers: req.headers
	};

	req.logMeta = {
		userId,
		userIp,
		httpRequestInfo
	};

	next();
};

export default logsMeta;
