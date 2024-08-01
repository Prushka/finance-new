import { Button } from "@/components/ui/button.tsx";
import { Rating, TextInput } from "@mantine/core";

function App() {
  return (
    <main className={"w-full h-full flex justify-center items-center flex-col"}>
      <TextInput
        label="Test"
        description="Description"
        size="lg"
        placeholder="Test"
      />
      <Button>Test</Button>
      <Rating defaultValue={2} />
    </main>
  );
}

export default App;
