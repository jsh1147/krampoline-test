const Title = ({ children, className }) => {
  return (
    <h3 className={`text-4xl font-bold text-green-700 ${className}`}>
      {children}
    </h3>
  );
};

export default Title;
