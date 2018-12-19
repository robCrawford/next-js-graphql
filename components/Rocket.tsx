type Props = {
    launched: boolean
}

export default ({ launched }: Props) => (
    <img src={`/static/rocket${launched ? "-launched" : ""}.png`} width="50px" />
);
