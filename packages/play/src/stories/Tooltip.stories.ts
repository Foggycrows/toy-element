import type { StoryObj, Meta } from "@storybook/vue3";

import { fn } from "@storybook/test"
import { ErTooltip } from "toy-element";
import 'toy-element/dist/theme/Tooltip.css'


type Story = StoryObj<typeof ErTooltip>

const meta: Meta<typeof ErTooltip> = {
  title: "Example/Tooltip",
  component: ErTooltip,
  tags: ["autodocs"],
  argTypes: {
    trigger: {
      options: ["hover", "click", "contextmenu"],
      control: {
        type: "select"
      }
    },
    placement: {
      options: ["top", "bottom", "left", "right"],
      control: {
        type: "select"
      }
    }
  },
  args: {
    "onVisible-change": fn(),
  }
}

export default meta;