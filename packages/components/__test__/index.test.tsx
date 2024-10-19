import type { Plugin } from "vue";
import { describe, it, expect } from "vitest";
import {
  ErAlert,
  ErButton,
  ErButtonGroup,
  ErCollapse,
  ErCollapseItem,
  ErIcon,
  ErTooltip,
} from "../index";
import { map, get } from "lodash-es";

const components = [
  ErButton,
  ErButtonGroup,
  ErCollapse,
  ErCollapseItem,
  ErIcon,
  ErAlert,
  ErTooltip,
] as Plugin[];

describe("components/index.ts", () => {
  it.each(map(components, (c) => [get(c, "name") ?? "", c]))("%s should be exported", (_, component) => {
    expect(component).toBeDefined();
    expect(component.install).toBeDefined()
  });

  // it('ErLoadingService and ErLoadingDirective should be exported',()=>{
  //   expect(ErLoadingService).toBeDefined()
  //   expect(ErLoadingDirective).toBeDefined()
  // })
});
