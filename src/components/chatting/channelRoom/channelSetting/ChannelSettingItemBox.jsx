const ChannelSettingItemBox = ({ children, title }) => {
  return (
    <div className="flex flex-col gap-2 border-b-2 pt-3 pb-5">
      <p className="font-light">{title}</p>
      {children}
    </div>
  );
};
export default ChannelSettingItemBox;
