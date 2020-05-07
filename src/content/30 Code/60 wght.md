```css
.text--bold {
  font-weight: bold;
}

@supports (font-variation-settings: normal) {
  .text--bold {
    font-variation-settings: "wght" 680;
    font-weight: 680;
  }
}
```
