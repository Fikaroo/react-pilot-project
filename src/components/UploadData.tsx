import * as xlsx from "xlsx";

import { Input } from "./ui/input";
import { Label } from "./ui/label";

import { Data } from "@/types";

import { useData } from "@/state";

const UploadData = () => {
  const { setData, setIsLoading, setError } = useData();

  const handleUploadData = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading();
    setError("");
    const val = e.target?.files?.[0];
    const docName = val?.name?.split(".")?.[1];
    if (!val || docName !== "xlsx") {
      setError("Something happen try again");
      throw Error("Something happen try again");
    }
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(val);

    fileReader.onload = async (e) => {
      const bufferArray = e?.target?.result;
      const wb = xlsx.read(bufferArray, { type: "buffer" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = xlsx.utils.sheet_to_json(ws) as Data[];
      console.log(data);
      data && setData(data);
    };
  };

  return (
    <Label>
      Load Excel File
      <Input
        type="file"
        onChange={handleUploadData}
        className="max-w-sm mt-1"
      />
    </Label>
  );
};

export default UploadData;
