const inspect = require("util").inspect;
const {parse} = require("csv-parse/sync");

module.exports = function(eleventyConfig) {
	eleventyConfig.addPassthroughCopy("src/assets/**");
	eleventyConfig.addFilter("inspect", function(content) {  return `<pre>${inspect(content)}</pre>` });
	eleventyConfig.addShortcode("hostname", function (url) {
		let urlObj = new URL(url);
		let hostname = urlObj.hostname;
		return hostname;
	  });
    eleventyConfig.addDataExtension("csv", (contents) => {
        const records = parse(contents, {
          columns: true,
          skip_empty_lines: true,
        });
        return records;
    });

	return {
    	"dir" : {
        	"input": "src",
        	"output": "dist"
    	}
	};
};
