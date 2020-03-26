import {select_route} from "./router";

const routing_tree = {
  "@": "Index",
  widget: {
    "@": "Widget",
    ":": {
      "~": "key",
      gadget: {"@": "Gadget"},
    },
  },
};

test("notfound", (): void => {
  const route = select_route(routing_tree, "notfound");
  expect(route).toBeUndefined();
});

test("index", (): void => {
  const route = select_route(routing_tree, "");
  expect(route).toBeDefined();
  expect(route?.module).toEqual("Index");
  expect(route?.params).toEqual({});
  expect(route?.headers).toEqual([]);
});

test("widget", (): void => {
  const route = select_route(routing_tree, "widget");
  expect(route).toBeDefined();
  expect(route?.module).toEqual("Widget");
  expect(route?.params).toEqual({});
  expect(route?.headers).toEqual([]);
});

test("gadget", (): void => {
  const route = select_route(routing_tree, "widget/value/gadget");
  expect(route).toBeDefined();
  expect(route?.module).toEqual("Gadget");
  expect(route?.params).toEqual({key: "value"});
  expect(route?.headers).toEqual([]);
});
