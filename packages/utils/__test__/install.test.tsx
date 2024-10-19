import { describe, expect, it } from "vitest";
import { defineComponent, createApp } from "vue";
import { mount } from "@vue/test-utils";
import { makeInstaller, withInstall } from "../install";

const AppComp = defineComponent({
  setup() {
    return () => <div>app</div>;
  },
});

const componentA = withInstall(
  defineComponent({
    name: "test",
    setup() {
      return () => <div>test</div>;
    },
  })
);

const componentB = withInstall(
  defineComponent({
    name: "test2",
    setup() {
      return () => <div>test2</div>;
    },
  })
);

describe("install", () => {
  it("withInstall should be worked", () => {
    const wapper = mount(() => <div id="app2"></div>);
    const app = createApp(AppComp);

    app.use(componentA).use(componentB).mount(wapper.element);

    expect(componentA.install).toBeDefined();
    expect(componentB.install).toBeDefined();
    expect(app._context.components['componentA']).toBeTruthy();
    expect(app._context.components['componentB']).toBeFalsy();
  });
  it ('makeInstall should be worked', () => {
    const wrapper = mount(() => <div id="app"></div>)
    const app = createApp(AppComp)
    const installer = makeInstaller([componentA, componentB])

    app.use(installer).mount(wrapper.element)

    expect(installer).toBeDefined()
    expect(app._context.components['componentA']).toBeTruthy();
    expect(app._context.components['componentB']).toBeFalsy();
  })
});
