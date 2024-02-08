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
    const updateDataList: Array<dataType> = [];
    const updatePageList: Array<number> = [];
    for (let i = 1; i <= pageQuantity; i++) {
      updatePageList.push(i);
    }
    setPageList(updatePageList);
    setPageNo(pageNo);
    if (mockData.length % 10 !== 0) {
      remaining = 1;
      setPageQuantity(Math.floor(mockData.length / 10) + remaining);
      if (pageNo === pageQuantity) {
        let endIndex: number = 0;
        endIndex = 10 - (mockData.length % 10);

        for (let i = pageNo * 10 - 1 - endIndex; i >= pageNo * 10 - 10; i--) {
          updateDataList.push(mockData[i]);
        }
        setDataList(updateDataList.reverse());
      } else {
        for (let i = pageNo * 10 - 1; i >= pageNo * 10 - 10; i--) {
          updateDataList.push(mockData[i]);
        }
        setDataList(updateDataList.reverse());
      }
    } else {
      setPageQuantity(Math.floor(mockData.length / 10));

      for (let i = pageNo * 10 - 1; i >= pageNo * 10 - 10; i--) {
        updateDataList.push(mockData[i]);
      }
      setDataList(updateDataList.reverse());
    }
  };
  const handleNextPage = () => {
    if (pageNo !== pageQuantity) {
      setPageNo(pageNo + 1);
    } else {
      alert("There is no other page!");
    }
  };
  const handlePerviousPage = () => {
    if (pageNo !== 1) {
      setPageNo(pageNo - 1);
    } else {
      alert("There is no other page!");
    }
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
          <button
            className="px-2 border-b-2 border-purple-500 hover:bg-violet-100 rounded-tr-md rounded-tl-md transition-all"
            onClick={handlePerviousPage}
          >
            previous
          </button>
          {pageList.map((pageNo: number, index: number) => {
            return (
              <button
                key={index + pageNo}
                className="mx-4 border-b-2 border-purple-950 hover:bg-violet-100 px-2 rounded-tr-md rounded-tl-md transition-all"
                onClick={() => handlePageNo(pageNo)}
              >
                {pageNo}
              </button>
            );
          })}
          <button
            className="px-2 border-b-2 border-purple-500 hover:bg-violet-100 rounded-tr-md rounded-tl-md transition-all"
            onClick={handleNextPage}
          >
            next
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
