import React from "react";
import { mount } from "enzyme";
import App from "./App";
import TodosTable from "./Components/Tables/TodosTable";
import ModalAddEdit from "./Components/Modals/ModalAddEdit";
import renderer from "react-test-renderer";
import mockedItems from "./Components/Tables/mockedItems";
import listHeaders from "./Components/Tables/listHeaders";
import { ToastBody, ToastHeader } from "reactstrap";

describe("App tests", () => {
  let appComponent;
  let todoTableComponent;

  const addItemToState = jest.fn((item) => {
    appComponent.setState((prevState) => ({
      items: [...prevState.items, item],
    }));
    updateCounters();
  });

  const countByPriority = jest.fn(() => {
    return [1, 3, 1];
  });

  const updateCounters = jest.fn(() => {
    const [counterHighPriority, counterMediumPriority, counterLowPriority] =
      countByPriority();
    appComponent.setState({
      highPriority: counterHighPriority,
      mediumPriority: counterMediumPriority,
      lowPriority: counterLowPriority,
    });
  });

  const updateState = jest.fn((item) => {
    const itemIndex = this.state.items.findIndex((data) => data.id === item.id);
    const newArray = [
      ...appComponent.state.items.slice(0, itemIndex),
      item,
      ...appComponent.state.items.slice(itemIndex + 1),
    ];
    appComponent.setState({ items: newArray });
    todoTableComponent.items = newArray;
    updateCounters();
  });

  const deleteItemFromState = jest.fn((id) => {
    const updatedItems = appComponent.state.items.filter(
      (item) => item.id !== id
    );
    appComponent.setState({ items: updatedItems });
    todoTableComponent.items = updatedItems;
    updateCounters();
  });

  beforeEach(() => {
    appComponent = mount(<App />);
    todoTableComponent = mount(
      <TodosTable
        columns={listHeaders}
        data={mockedItems}
        updateState={updateState}
        deleteItemFromState={deleteItemFromState}
        loading={false}
      />
    );
    updateCounters();
  });

  describe("App rendering tests", () => {
    it("renders App without crashing", () => {
      renderer.create(<App />);
    });

    it("snapshot test render correctly App component", () => {
      const app = renderer.create(<App />).toJSON();
      expect(app).toMatchSnapshot();
    });

    it("renders the ModalAddEdit to add a new to-do ", () => {
      const modalAddEdit = appComponent.find(ModalAddEdit);
      expect(modalAddEdit).toHaveLength(1);
      expect(modalAddEdit.text()).toBe("Add To-do");
    });

    it("renders the priority counters correctly", () => {
      const toastHeaders = appComponent.find(ToastHeader);
      expect(toastHeaders).toHaveLength(3);

      // high priority counter header
      expect(toastHeaders.at(0).text()).toBe("1-High Priority");

      // medium priority counter header
      expect(toastHeaders.at(1).text()).toBe("2-Medium Priority");

      // low priority counter header
      expect(toastHeaders.at(2).text()).toBe("3-Low Priority");

      // and counters should be zero initially
      const toastValues = appComponent.find(".toast-body");
      expect(toastValues).toHaveLength(3);

      expect(toastValues.at(0).text()).toBe("0");
      expect(toastValues.at(1).text()).toBe("0");
      expect(toastValues.at(2).text()).toBe("0");
    });
  });

  describe("Priority counters tests", () => {
    it("App displays values on priority counters correctly", () => {
      // set state values
      appComponent.setState({
        items: mockedItems,
      });
      updateCounters();

      const table = todoTableComponent.find("table");
      const body = table.find("tbody");
      const rows = body.find("tr");
      expect(rows).toHaveLength(5);

      const toastHeaders = appComponent.find(ToastHeader);
      expect(toastHeaders).toHaveLength(3);
      expect(toastHeaders.at(0).text()).toBe("1-High Priority");
      expect(toastHeaders.at(1).text()).toBe("2-Medium Priority");
      expect(toastHeaders.at(2).text()).toBe("3-Low Priority");

      // check for counters to have values 1,3,1
      const toastValues = appComponent.find(ToastBody);
      expect(toastValues).toHaveLength(3);

      expect(toastValues.at(0).text()).toBe("1");
      expect(toastValues.at(1).text()).toBe("3");
      expect(toastValues.at(2).text()).toBe("1");
    });
  });

  describe("Add new task todo test", () => {
    it("Save button in the Add new task to-do form should add to-do on the table correctly", () => {
      // Set initial data in TodosTable with 5 items
      appComponent.state = {
        items: mockedItems,
        highPriority: 1,
        mediumPriority: 3,
        lowPriority: 1,
      };
      updateCounters();

      // Simulate a change in the item for the to-do with id="zing", now its "zang" and low priority
      const newItem = {
        id: "new",
        taskName: "New item added",
        priority: "3-Low",
        priorityValue: 3,
        status: "Pending",
        statusValue: 1,
      };

      addItemToState(newItem);

      // and check for the new item on the table
      // {
      //   id: "new",
      //   taskName: "New item added",
      //   priority: "3-Low",
      //   priorityValue: 3,
      //   status: "Pending",
      //   statusValue: 1,
      // },

      const tableAfterAdd = appComponent.find("table");
      const body = tableAfterAdd.find("tbody");
      const tds = body.find("td");

      expect(tds.at(0).text()).toBe("new");
      expect(tds.at(1).text()).toBe("New item added");
      expect(tds.at(2).text()).toBe("3-Low");
    });
  });
});
