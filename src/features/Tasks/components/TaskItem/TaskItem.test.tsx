import { render, screen, fireEvent } from "react-testing-library";
import TaskItem from "./TaskItem";

describe("TaskItem component", () => {
  it("renders essential elements", () => {
    render(
      <TaskItem title="Example task" onToggle={() => {}} onDelete={() => {}} />
    );
    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("content")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
    expect(screen.getByTestId("completed")).toBeInTheDocument();
    expect(
      screen.getByTestId("completed").querySelector('input[type="checkbox"]')
    ).not.toBeChecked();
    expect(screen.getByTestId("delete")).toBeInTheDocument();
    expect(screen.getByTestId("dueDate")).toBeInTheDocument();
    expect(screen.getByTestId("dueDate").textContent).toBeFalsy();
    expect(screen.getByTestId("subtasks")).toBeInTheDocument();
    expect(screen.getByTestId("subtasks").textContent).toBeFalsy();
    expect(screen.getByTestId("tags")).toBeInTheDocument();
    expect(screen.getByTestId("tags").textContent).toBeFalsy();
  });

  it("renders all elements correctly", () => {
    render(
      <TaskItem
        title="Example task"
        description="Example description"
        tags={["hello", "world"]}
        completed
        dueDate={new Date()}
        subtasks={[1, 2]}
        onToggle={() => {}}
        onDelete={() => {}}
      />
    );
    expect(screen.getByTestId("title")).toHaveTextContent("Example task");
    expect(screen.getByTestId("description")).toHaveTextContent(
      "Example description"
    );
    expect(
      screen.getByTestId("completed").querySelector('input[type="checkbox"]')
    ).toBeChecked();
    expect(screen.getByTestId("dueDate").textContent).toBeTruthy();
    expect(screen.getByTestId("subtasks").textContent).toBeTruthy();
    expect(screen.getByTestId("tags").textContent).toBeTruthy();
    expect(screen.findByText("hello")).toBeTruthy();
    expect(screen.findByText("world")).toBeTruthy();
  });

  it("handles events", () => {
    const onToggle = jest.fn();
    const onDelete = jest.fn();

    render(
      <TaskItem title="Example task" onToggle={onToggle} onDelete={onDelete} />
    );

    fireEvent.click(
      screen.getByTestId("completed").querySelector('input[type="checkbox"]')
    );
    fireEvent.click(screen.getByTestId("delete"));

    expect(onToggle).toHaveBeenCalledTimes(1);
    expect(onDelete).toHaveBeenCalledTimes(1);
  });
});
