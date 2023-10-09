import "react-tabulator/lib/styles.css";
import "react-tabulator/css/tabulator.min.css";
import { ReactTabulator, reactFormatter } from "react-tabulator";
import { Data } from "@/types";
import { TrashIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import FormData from "./FormData";
import { useData } from "@/state";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const EditButton = (props: any) => {
  const rowData = props.cell._cell.row.data;
  return <FormData isEdit data={rowData} />;
};

const DeleteButton = (props: any) => {
  const dataId = props.cell._cell.row.data.id;
  return (
    <Button
      variant="ghost"
      onClick={() => useData.getState().deleteData(dataId)}
    >
      <TrashIcon />
    </Button>
  );
};

const columns = [
  {
    title: "id",
    field: "id",
    sorter: "number",
  },
  {
    title: "len",
    field: "len",
  },
  {
    title: "wkt",
    field: "wkt",
  },
  { title: "status", field: "status", hozAlign: "center" },
  {
    formatter: reactFormatter(<DeleteButton />),
    hozAlign: "center",
  },
  {
    formatter: reactFormatter(<EditButton />),
    hozAlign: "center",
  },
];

const Table = ({ data }: { data: Data[] }) => {
  return (
    <ReactTabulator
      data={data}
      columns={columns}
      page={1}
      size={10}
      initialSort={[{ column: "id", dir: "desc" }]}
      options={{
        pagination: "local",
        paginationSize: 10,
        paginationInitialPage: 1,
        paginationSizeSelector: [10, 25, 50, 75, 100],
        layout: "fitDataTable",
      }}
    />
  );
};

export default Table;
