import FormData from "./components/FormData";
import PieChart from "./components/PieChart";
import Table from "./components/Table";
import ToggleButton from "./components/ToggleButton";
import UploadData from "./components/UploadData";
import VerticalChart from "./components/VerticalChart";
import { useData } from "./state";

const App = () => {
  const { data, isLoading, error } = useData();

  const lenData = data?.length > 0;

  return (
    <div className="container mx-auto">
      {/* Task 1
 // TODO : Create button for upload data 
 */}
      <div className="flex items-end gap-4 py-4">
        <UploadData />
        {lenData ? <FormData isAdd={true} /> : null}
      </div>

      {isLoading ? (
        <>Loading</>
      ) : error ? (
        <>Something happened</>
      ) : lenData ? (
        <div className="space-y-5">
          <Table data={data} />

          <div className="grid h-full grid-cols-2 gap-4 place-items-start">
            <ToggleButton title="Analysis 1">
              <PieChart />
            </ToggleButton>

            <ToggleButton title="Analysis 2">
              <VerticalChart />
            </ToggleButton>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default App;
