import {testData, metaData} from '../components/testData'

export function readData(tableName, pageNum) {
    return {"metadata": metaData, "rows": testData, "pages": 1}
}