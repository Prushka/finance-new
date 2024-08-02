import { Button } from "@/components/ui/button.tsx";
import { Rating, TextInput } from "@mantine/core";

function App() {
  return (
    <div className={"w-full h-full flex items-center flex-col gap-4"}>
      <TextInput
        label="Test"
        description="Description"
        size="lg"
        placeholder="Test"
      />
      <Button>Test</Button>
      <Rating defaultValue={2} />
    </div>
  );
}

export default App;
