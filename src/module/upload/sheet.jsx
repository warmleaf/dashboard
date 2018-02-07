/* xlsx.js (C) 2013-present  SheetJS -- http://sheetjs.com */
/* Notes:
   - usage: `ReactDOM.render( <Sheet />, document.getElementById('app') );`
   - xlsx.full.min.js is loaded in the head of the HTML page
   - this script should be referenced with type="text/babel"
   - babel.js in-browser transpiler should be loaded before this script
*/
import React, { Component } from 'react'
import Base from '../../components/base'
import Flex from '../../components/flex'
import XLSX from 'xlsx'

class Sheet extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [], /* Array of Arrays e.g. [["a","b"],[1,2]] */
			cols: []  /* Array of column objects e.g. { name: "C", K: 2 } */
		};
		this.handleFile = this.handleFile.bind(this);
		this.exportFile = this.exportFile.bind(this);
	};
	handleFile(file/*:File*/) {
		/* Boilerplate to set up FileReader */
		const reader = new FileReader();
		reader.onload = (e) => {
			/* Parse data */
			const bstr = e.target.result;
			const wb = XLSX.read(bstr, { type: 'binary' });
			/* Get first worksheet */
			const wsname = wb.SheetNames[0];
			const ws = wb.Sheets[wsname];
			/* Convert array of arrays */
			const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
			/* Update state */
			this.setState({ data: data, cols: make_cols(ws['!ref']) });
		};
		reader.readAsBinaryString(file);
	};
	exportFile() {
		/* convert state to workbook */
		const ws = XLSX.utils.aoa_to_sheet(this.state.data);
		const wb = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
		/* generate XLSX file */
		const wbout = XLSX.write(wb, { type: "array", bookType: "xlsx" });
		/* send to client */
		// saveAs(new Blob([wbout],{type:"application/octet-stream"}), "sheetjs.xlsx");
	};
	render() {
		console.log(this.state)
		return (
			<Flex column w="100%">
				<DragDropFile handleFile={this.handleFile}>
					<Flex column hc vc h="100%">
						<Base.Span>
							<Base.Span>点击</Base.Span>
							<DataInput handleFile={this.handleFile} />
							<Base.Span>或拖拽上传，文件格式请</Base.Span>
							<Base.Span>查看</Base.Span>
						</Base.Span>
						<Base.Span>支持Excel和CSV文件（单个Excel最大100M，CSV最大200M）</Base.Span>
					</Flex>
				</DragDropFile>
				<OutTable data={this.state.data} cols={this.state.cols} />
			</Flex>
		);
	};
};

/* -------------------------------------------------------------------------- */

/*
  Simple HTML5 file drag-and-drop wrapper
  usage: <DragDropFile handleFile={handleFile}>...</DragDropFile>
    handleFile(file:File):void;
*/
class DragDropFile extends Component {
	constructor(props) {
		super(props);
		this.onDrop = this.onDrop.bind(this);
	};
	suppress(evt) { evt.stopPropagation(); evt.preventDefault(); };
	onDrop(evt) {
		evt.stopPropagation(); evt.preventDefault();
		const files = evt.dataTransfer.files;
		if (files && files[0]) this.props.handleFile(files[0]);
	};
	render() {
		return (
			<Base.Div
				onDrop={this.onDrop}
				onDragEnter={this.suppress}
				onDragOver={this.suppress}
				height="120px"
				border="1px dashed rgba(0,0,0,.08)"
				baco="rgba(0,0,0,.01)"
				bora="2px"
			>
				{this.props.children}
			</Base.Div>
		);
	};
};

/*
  Simple HTML5 file input wrapper
  usage: <DataInput handleFile={callback} />
    handleFile(file:File):void;
*/
class DataInput extends Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
	};
	handleChange(e) {
		const files = e.target.files;
		if (files && files[0]) this.props.handleFile(files[0]);
	};
	render() {
		return (
			<input type="file" className="form-control" id="file" accept={SheetJSFT} onChange={this.handleChange} />
		);
	};
}

/*
  Simple HTML Table
  usage: <OutTable data={data} cols={cols} />
    data:Array<Array<any> >;
    cols:Array<{name:string, key:number|string}>;
*/
class OutTable extends Component {
	constructor(props) {
		super(props)
	}
	render() {
		return (
			<Flex column pt="20px">
				<Flex vc="space-between" mb="10px">
					<Base.Span>文件预览</Base.Span>
					<Base.Span>首行设为标题</Base.Span>
				</Flex>
				<Flex
					column
					w="100%"
					mih="66px"
					b="1px solid rgba(0,0,0,.08)"
					bgc="rgba(0,0,0,.01)"
					round="2px"
				>
					<Base.Table border="0" width="100%" position="relative">
						<Base.Thead width="100%">
							<Base.Tr width="100%">{this.props.cols.map(col =>
								<Base.Th
									height="42px"
									bori="1px solid rgba(0,0,0,.08)"
									padding="0"
									key={col.key}
								>{col.name}</Base.Th>
							)}</Base.Tr>
						</Base.Thead>
						<Base.Tbody baco="#fff">
							{this.props.data.map((d, i) => <Base.Tr key={i}>
								{this.props.cols.map(col => <Base.Td bori="1px solid rgba(0,0,0,.08)" key={col.key}>{d[col.key]}</Base.Td>)}
							</Base.Tr>)}
						</Base.Tbody>
					</Base.Table>
				</Flex>
			</Flex>
		);
	};
};

/* list of supported file types */
const SheetJSFT = [
	"xlsx", "xlsb", "xlsm", "xls", "xml", "csv", "txt", "ods", "fods", "uos", "sylk", "dif", "dbf", "prn", "qpw", "123", "wb*", "wq*", "html", "htm"
].map(function (x) { return "." + x; }).join(",");

/* generate an array of column objects */
const make_cols = refstr => Array(XLSX.utils.decode_range(refstr).e.c + 1).fill(0).map((x, i) => ({ name: XLSX.utils.encode_col(i), key: i }));

export default Sheet