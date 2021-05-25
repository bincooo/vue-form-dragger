import { Options, Vue } from "vue-class-component"

@Options({
  name: "form-element"
})
export class FormElement extends Vue {
  render() {
    return <a-form title="表单" style="min-height: 200px"></a-form>
  }
}

@Options({
  name: "input-element"
})
export class InputElement extends Vue {
  render() {
    return (
      <a-form-item label="Activity name">
        <a-input />
      </a-form-item>
    )
  }
}
