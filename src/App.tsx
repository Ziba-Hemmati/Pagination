import { useEffect, useState } from "react";
import mockData from "./data/mock.json";
type dataType = {
  id: number;
  name: string;
  email: string;
};
function App() {
  const [pageQuantity, setPageQuantity] = useState<number>(0);
  const [pageNo, setPageNo] = useState<number>(1);
  const [dataList, setDataList] = useState<dataType[]>([]);
  const [pageList, setPageList] = useState<number[]>([]);
  const handlePageNo = (pageNo: number) => {
    let remaining: number = 0;
    if (mockData.length % 10 > 0) {
      remaining = 1;
    }
    setPageQuantity(Math.floor(mockData.length / 10) + remaining);
    setPageNo(pageNo);
    const updateDataList: Array<dataType> = [];
    for (let i = pageNo * 10 - 1; i >= pageNo * 10 - 10; i--) {
      updateDataList.push(mockData[i]);
    }
    setDataList(updateDataList.reverse());
    const updatePageList: Array<number> = [];
    for (let i = 1; i <= pageQuantity; i++) {
      updatePageList.push(i);
    }
    setPageList(updatePageList);
  };
  useEffect(() => {
    handlePageNo(pageNo);
  }, [pageQuantity, pageNo]);

  return (
    <div className="p-10">
      <div className="w-full flex justify-center">
        <table className="w-1/2">
          <thead className="border-2 border-purple-900">
            <tr>
              <th className="p-2">ID</th>
              <th className="p-2">NAME</th>
              <th className="p-2">EMAIL</th>
            </tr>
          </thead>
          {dataList.map((item: dataType) => {
            return (
              <tbody
                key={item.id}
                className="text-center border-2 border-purple-900"
              >
                <tr>
                  <td> {item.id} </td>
                  <td> {item.name} </td>
                  <td> {item.email} </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
      <div className="flex justify-center mt-8">
        <div>
          <button className="px-2 border-b-2 border-purple-500">
            previous
          </button>
          {pageList.map((pageNo: number, index) => {
            return (
              <button
                key={index}
                className="mx-4 border-b-2 border-purple-950"
                onClick={() => handlePageNo(pageNo)}
              >
                {pageNo}
              </button>
            );
          })}
          <button className="px-2 border-b-2 border-purple-500">next</button>
        </div>
      </div>
    </div>
  );
}

export default App;
