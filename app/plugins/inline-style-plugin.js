/**
 * @class InlineStylePlugin
 * @description Plugin for inlining our css as style tags
 */
module.exports = class InlineStylePlugin {
	constructor(htmlWebpackPlugin, patterns) {
		this.htmlWebpackPlugin = htmlWebpackPlugin;
		this.patterns = patterns;
	}

	isMatch(tag, publicPath) {
		// We are only interested in style tags
		if (tag.tagName !== 'link' || !(tag.attributes && tag.attributes.href)) {
			return false;
		}

		// Get the name or our asset
		let name = publicPath
			? tag.attributes.href.replace(publicPath, '')
			: tag.attributes.href;

		return this.patterns.some(pattern => pattern.test(name));
	}

	generateStyleTag(tag, publicPath, assets) {
		// Get the name or our asset
		let name = publicPath
			? tag.attributes.href.replace(publicPath, '')
			: tag.attributes.href;

		let asset = assets[name];

		// If we cannot find the asset, return the original tag
		return asset != null
			? { tagName: 'style', innerHTML: asset.source(), closeTag: true }
			: tag;
	}

	apply(compiler) {
		let publicPath = compiler.options.output.publicPath;

		compiler.hooks.compilation.tap('InlineStylePlugin', compilation => {
			let hooks = this.htmlWebpackPlugin.getHooks(compilation);

			hooks.alterAssetTagGroups.tap('InlineStylePlugin', assets => {
				// Inline all style tags, we should move them to the head as well
				let bodyTags = assets.bodyTags.filter(tag => this.isMatch(tag, publicPath));
				let headTags = assets.headTags.filter(tag => this.isMatch(tag, publicPath));

				// // Keep anything that doesnt match in our original body tags
				assets.bodyTags = assets.bodyTags.filter(tag => !this.isMatch(tag, publicPath));

				// // Generate all our inline styles
				let inlineTags = Array.prototype.concat(
					bodyTags.map(tag => this.generateStyleTag(tag, publicPath, compilation.assets)),
					headTags.map(tag => this.generateStyleTag(tag, publicPath, compilation.assets))
				);

				// Include any original head tags as well as our new inline tags
				assets.headTags = Array.prototype.concat(
					assets.headTags.filter(tag => !this.isMatch(tag, publicPath)),
					inlineTags
				);
			});
		});
	}
};
