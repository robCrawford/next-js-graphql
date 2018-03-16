export default ({ launched }) => (
    <img
        src={`/static/rocket${launched === "true" ? "-launched" : ""}.png`}
        width="50px"
    />
);
