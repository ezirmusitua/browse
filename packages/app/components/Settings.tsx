import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { addEndpoint, iEndpoint } from "../storage";

function Input({ disabled, value, name, placeholder, onChange }) {
  return (
    <input
      disabled={disabled}
      value={value}
      onChange={onChange}
      name={name}
      placeholder={placeholder}
      className="px-2 py-1 bg-white text-black text-lg border border-gray-200 rounded-lg"
    ></input>
  );
}

const useSettingsForm = () => {
  const router = useRouter();
  const [values, setValues] = useState<iEndpoint>({
    name: "",
    api: "",
    root: "",
    token: "",
  });
  const [state, setState] = useState({ loading: false, err: "" });

  const validateValues = useCallback(() => {
    if (!values.api || !values.api.startsWith("http")) {
      setState({
        loading: false,
        err: "请输入正确的接口地址(如: http://localhost:3000)",
      });
      return false;
    }
    if (!values.root) {
      setState({
        loading: false,
        err: "请输入正确的接口地址(如: http://localhost:3000)",
      });
      return false;
    }
    return true;
  }, [values]);

  const onChangeValue = useCallback(
    (f: string, e: any) => {
      setValues({ ...values, [f]: e.target.value });
    },
    [values]
  );

  const onSubmit = useCallback(async () => {
    if (state.loading) return;
    const valid = validateValues();
    if (!valid) return;
    setState({ err: "", loading: true });
    await addEndpoint(values);
    router.replace(`/?${new URLSearchParams({ root: values.root })}`);
    setState({ err: "", loading: false });
  }, [values, state, validateValues, router]);

  return { onSubmit, onChange: onChangeValue, values, state };
};

function Form() {
  const { state, onSubmit, onChange, values } = useSettingsForm();
  return (
    <div className="px-6 py-5 bg-white rounded-lg">
      <div className="pb-5 pt-1">
        <p className="text-xl text-black">文件服务器配置</p>
      </div>
      <div className="min-w-[360px] flex flex-col gap-5">
        <Input
          disabled={state.loading}
          value={values.name}
          onChange={(e) => onChange("name", e)}
          name="name"
          placeholder="名称"
        ></Input>
        <Input
          disabled={state.loading}
          value={values.api}
          onChange={(e) => onChange("api", e)}
          name="api"
          placeholder="后端接口"
        ></Input>
        <Input
          disabled={state.loading}
          value={values.root}
          onChange={(e) => onChange("root", e)}
          name="root"
          placeholder="根目录"
        ></Input>
        <Input
          disabled={state.loading}
          value={values.token}
          onChange={(e) => onChange("token", e)}
          name="token"
          placeholder="访问密钥"
        ></Input>
      </div>
      <div className="relative pt-8 w-full">
        <p className="absolute top-2 w-full text-red-500 text-sm text-center">
          {state.err}
        </p>
        <button
          disabled={state.loading}
          className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg"
          onClick={onSubmit}
        >
          <span className="text-white">保存配置</span>
        </button>
      </div>
    </div>
  );
}
function SettingsModal() {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-gray-400 bg-opacity-50 backdrop-blur-md shadow-2xl">
      <Form></Form>
    </div>
  );
}

export default SettingsModal;
