import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

const types = {
  INPUT: "input",
  SELECT: "select",
  TEXTAREA: "textarea",
};

function CommonForm({ formControls, formData, setFormData, onSubmit, buttonText, isBtnDisabled }) {
  
  function renderInputElement(controlItem) {
    let element = null;
    const value = formData[controlItem.name] || "";

    switch (controlItem.componentType) {
      case types.INPUT:
        element = (
          <Input
            name={controlItem.name}
            id={controlItem.name}
            placeholder={controlItem.placeholder}
            type={controlItem.type}
            value={value}
            onChange={(event)=>setFormData({
              ...formData,
              [controlItem.name]: event.target.value,
            })}
          />
        );
        break;

      case types.SELECT:
        element = (
          <Select 
            onValueChange={(value)=>setFormData({
              ...formData,
              [controlItem.name]: value,
            })
          }  
          value={value}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={controlItem.label} />
            </SelectTrigger>
            <SelectContent>
              {controlItem.options && controlItem.options.length > 0
                ? controlItem.options.map((optionItem) => (
                    <SelectItem key={optionItem.id} value={optionItem.id}>
                      {optionItem.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );
        break;

      case types.TEXTAREA:
        element = (
          <Textarea
            name={controlItem.name}
            placeholder={controlItem.placeholder}
            id={controlItem.name}
            value={value}
            onChange={event=>setFormData({
              ...formData,
              [controlItem.name]: event.target.value,
            })}
          />
        );
        break;

      default:
        element = (
          <Input
            name={controlItem.name}
            placeholder={controlItem.placeholder}
            id={controlItem.name}
            type={controlItem.type}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [controlItem.name]: event.target.value,
              })
            }
          />
        );
        break;
    }

    return element;
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-3">
        {formControls.map((controlItem) => (
          <div key={controlItem.name} className="grid w-full gap-1.5">
            <Label className="mb-1">{controlItem.label}</Label>
            {renderInputElement(controlItem)}
          </div>
        ))}
      </div>
      <Button disabled={isBtnDisabled} type="submit" className="mt-2 w-full">
        {buttonText || "Submit"}
      </Button>
    </form>
  );
}

export default CommonForm;