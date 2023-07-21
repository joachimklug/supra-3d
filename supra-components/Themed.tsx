/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import { Box as GBox } from "@/components";
import { styled } from "@gluestack-style/react";
import { config } from "@/gluestack-ui.config";

export const defaultBgLight = config.theme.tokens.colors.backgroundLight100;
export const defaultBgDark = config.theme.tokens.colors.backgroundDark950;
export const defaultNavLight = config.theme.tokens.colors.backgroundLight100;
export const defaultNavDark = config.theme.tokens.colors.backgroundDark900;
export const defaultTextLight = config.theme.tokens.colors.textLight100;
export const defaultTextDark = config.theme.tokens.colors.textDark900;

export const Box = styled(GBox, {
  _dark: {
    bgColor: defaultBgDark,
  },
  _light: {
    bgColor: defaultBgLight,
  },
});
