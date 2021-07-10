import React from "react";
import { mount } from "enzyme";
import App from "./App";
import TodosTable from "./Components/Tables/TodosTable";
import ModalAddEdit from "./Components/Modals/ModalAddEdit";
import renderer from "react-test-renderer";
import mockedItems from "./Components/Tables/mockedItems";
import listHeaders from "./Components/Tables/listHeaders";
import {
  ToastBody,
  ToastHeader,
} from "reactstrap";

describe("App tests", () => {
  let appComponent;
  let todoTableComponent;
  beforeEach(() => {
    appComponent = mount(<App />);
    todoTableComponent = mount(
      <TodosTable
        columns={listHeaders}
        data={mockedItems}
        updateState={App.updateState}
        deleteItemFromState={App.deleteItemFromState}
        loading={false}  
      />
    );

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
      
      const toastHeaders = appComponent.find(ToastHeader)
      expect(toastHeaders).toHaveLength(3);

      // high priority counter header
      expect(toastHeaders.at(0).text()).toBe("High Priority");

      // medium priority counter header
      expect(toastHeaders.at(1).text()).toBe("Medium Priority");

      // low priority counter header
      expect(toastHeaders.at(2).text()).toBe("Low Priority");

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
      const countByPriority = jest.fn(() => {
        return [1,3,1];
      });
  
      const updateCounters = jest.fn(() => {
        const [counterHighPriority, counterMediumPriority, counterLowPriority] =
        countByPriority();
        appComponent.setState({
            highPriority: counterHighPriority,
            mediumPriority: counterMediumPriority,
            lowPriority: counterLowPriority,
        })
      });
      updateCounters();
      
      const table = todoTableComponent.find("table");
      const body = table.find("tbody");
      const rows = body.find("tr");
      expect(rows).toHaveLength(5);

      const toastHeaders = appComponent.find(ToastHeader)
      expect(toastHeaders).toHaveLength(3);
      expect(toastHeaders.at(0).text()).toBe("High Priority");
      expect(toastHeaders.at(1).text()).toBe("Medium Priority");
      expect(toastHeaders.at(2).text()).toBe("Low Priority");

      // check for counters to have values 1,3,1
      const toastValues = appComponent.find(ToastBody);
      expect(toastValues).toHaveLength(3);
     
      expect(toastValues.at(0).text()).toBe("1");
      expect(toastValues.at(1).text()).toBe("3");
      expect(toastValues.at(2).text()).toBe("1");
    });

  });
});
