import React from "react";
import { shallow, mount } from "enzyme";
import Person from "./components/Person/Person";


const person = {
    id: 2,
    name: "Nikola",
    craft: "ISS"
};

it("renders without crashing", () => {
    shallow(<Person />);
});

describe("<Person />", () => {
    it('person accepts name props', () => {
        const wrapper = mount(<Person name={person.name} />);
        expect(wrapper.props().name).toEqual(person.name);
    })
});