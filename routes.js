const routes = require("next-routes")();

routes
	.add("/Patient/:address/upload", "/Patient/upload")
	.add("/Patient/:address/access", "/Patient/access")
	.add("/Patient/:address", "/Patient")
	.add("/Doctor/:address", "Doctor/");

module.exports = routes;
