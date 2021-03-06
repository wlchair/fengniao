'use strict';
define(function(require) {
	var Backbone = require('lib/backbone'),
		send = require('basic/tools/send'),
		cells = require('collections/cells'),
		cache = require('basic/tools/cache'),
		config = require('spreadsheet/config'),
		history = require('basic/tools/history'),
		headItemCols = require('collections/headItemCol'),
		headItemRows = require('collections/headItemRow'),
		selectRegions = require('collections/selectRegion'),
		getOperRegion = require('basic/tools/getoperregion'),
		rowOperate = require('entrance/row/rowoperation'),
		colOperate = require('entrance/col/coloperation');


	var setFontSize = function(sheetId, fontSize, label) {
		var clip,
			region,
			operRegion,
			sendRegion,
			headItemRowList = headItemRows.models,
			headItemColList = headItemCols.models,
			changeModelList = [];

		clip = selectRegions.getModelByType('clip');
		if (clip !== undefined) {
			cache.clipState = 'null';
			clip.destroy();
		}
		if (cache.protectState) {
			Backbone.trigger('event:showMsgBar:show','保护状态，不能进行该操作');
			return;
		}
		region = getOperRegion(label);
		operRegion = region.operRegion;
		sendRegion = region.sendRegion;

		if (operRegion.startColIndex === -1 || operRegion.startRowIndex === -1) {
			sendData();
			return;
		}

		if (operRegion.endRowIndex === 'MAX') {
			colOperate.colPropOper(operRegion.startColIndex, operRegion.endColIndex, 'content.size', fontSize);
		} else if (operRegion.endColIndex === 'MAX') { //整行操作
			rowOperate.rowPropOper(operRegion.startRowIndex, operRegion.endRowIndex, 'content.size', fontSize);
		} else {
			cells.oprCellsByRegion(operRegion, function(cell, colSort, rowSort) {
				if (cell.get('content').size !== fontSize) {
					changeModelList.push({
						colSort: colSort,
						rowSort: rowSort,
						value: cell.get('content').size
					});
					cell.set('content.size', fontSize);
				}
			});
			history.addAction(history.getCellPropUpdateAction('content.size', fontSize, {
				startColSort: headItemColList[operRegion.startColIndex].get('sort'),
				startRowSort: headItemRowList[operRegion.startRowIndex].get('sort'),
				endColSort: headItemColList[operRegion.endColIndex].get('sort'),
				endRowSort: headItemRowList[operRegion.endRowIndex].get('sort')
			}, changeModelList));
		}
		sendData();

		function sendData() {
			send.PackAjax({
				url: config.url.cell.fontSize,
				data: JSON.stringify({
					coordinate: sendRegion,
					size: fontSize
				})
			});
		}

	};
	return setFontSize;
});