```css
.bold {
  font-synthesis: none;
  font-weight: bold;
}

@supports (font-variation-settings: normal) {
  .bold {
    font-variation-settings: "wght" 680;
    font-weight: 680;
  }
}
```
