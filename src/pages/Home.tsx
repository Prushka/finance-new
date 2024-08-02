import { TextInput, Rating, Button } from "@mantine/core";

export default function Home() {
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
