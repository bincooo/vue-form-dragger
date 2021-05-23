import { Options, Vue } from "vue-class-component"

@Options({
  name: "form-element"
})
export class FormElement extends Vue {
  render() {
    return (
      <div>
        <a-form title="表单" style="min-height: 200px"></a-form>
      </div>
    )
  }
}
