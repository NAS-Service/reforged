import Alpine from 'alpinejs'

Alpine.data('dropdown', () => ({
  open: false,
  toggle(): void {
    if (this.open) {
      return this.close()
    }

    this.$refs.button.focus()
    this.open = true
  },
  close(element): void {
    if (!this.open) {
      return
    }

    this.open = false
    element && element.focus()
  },
}))

Alpine.start()
