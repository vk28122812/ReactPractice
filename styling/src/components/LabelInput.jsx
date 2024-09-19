export default function LabelInput({invalid, label, ...props}){
    return  <p>
        <label>{label}</label>
        <input {...props}  />
    </p>
}