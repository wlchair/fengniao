define(function(require) {
	'use strict';
	var Backbone = require('lib/backbone'),
		BackboneNest = require('lib/backbone.nested');


	/**
	 * 列模型对象
	 * @author ray wu
	 * @since 0.1.0
	 * @class LineCol  
	 * @module models
	 * @extends Backbone.Collection
	 * @constructor
	 */
	var LineColModel = Backbone.Model.extend({
		defaults: {
			/**
			 * 排序码
			 * @property {Number}
			 */
			sort: 0,
			/**
			 * 别名，唯一标识
			 * @property {string} alias
			 */
			alias: '',
			/**
			 * 相对位置`left`值
			 * @property {number} left
			 */
			left: 0,
			/**
			 * 宽度
			 * @property {number} width
			 */
			width: 71,
			/**
			 * 显示的名字
			 * @property {string} displayName
			 */
			displayName: '',
			/**
			 * 是否被选中
			 * @property {boolean} activeState
			 */
			activeState: false,
			/**
			 * 是否显示
			 * @property {boolean} isView
			 */
			isView: true
		},
		/**
		 * 销毁`model`对象的视图
		 *
		 * @method destoryView
		 */
		destoryView: function() {
			this.set('isView', false);
		}
	});
	return LineColModel;
});