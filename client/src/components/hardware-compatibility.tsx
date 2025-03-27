interface CompatibilityItem {
  hardware: string;
  networkAttack: boolean;
  rfidCloning: boolean;
  keylogger: boolean;
  sdr: boolean;
  wifiHacking: boolean;
}

interface HardwareCompatibilityProps {
  compatibilityData: CompatibilityItem[];
}

const HardwareCompatibility = ({ compatibilityData }: HardwareCompatibilityProps) => {
  return (
    <div className="bg-[#1A1A1A] rounded-lg overflow-hidden border border-[#00FF00]/20">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-[#00FF00]/20 bg-[#0D0D0D]/50">
              <th className="py-3 px-4 text-left text-sm font-mono">Hardware</th>
              <th className="py-3 px-4 text-left text-sm font-mono">Network Attack</th>
              <th className="py-3 px-4 text-left text-sm font-mono">RFID Cloning</th>
              <th className="py-3 px-4 text-left text-sm font-mono">Keylogger</th>
              <th className="py-3 px-4 text-left text-sm font-mono">SDR</th>
              <th className="py-3 px-4 text-left text-sm font-mono">WiFi Hacking</th>
            </tr>
          </thead>
          <tbody>
            {compatibilityData.map((item, index) => (
              <tr 
                key={index} 
                className={`${index < compatibilityData.length - 1 ? 'border-b border-[#00FF00]/10' : ''}`}
              >
                <td className="py-3 px-4 font-medium">{item.hardware}</td>
                <td className="py-3 px-4">
                  {item.networkAttack ? (
                    <i className="fas fa-check-circle text-[#00FF00]"></i>
                  ) : (
                    <i className="fas fa-times-circle text-gray-400"></i>
                  )}
                </td>
                <td className="py-3 px-4">
                  {item.rfidCloning ? (
                    <i className="fas fa-check-circle text-[#00FF00]"></i>
                  ) : (
                    <i className="fas fa-times-circle text-gray-400"></i>
                  )}
                </td>
                <td className="py-3 px-4">
                  {item.keylogger ? (
                    <i className="fas fa-check-circle text-[#00FF00]"></i>
                  ) : (
                    <i className="fas fa-times-circle text-gray-400"></i>
                  )}
                </td>
                <td className="py-3 px-4">
                  {item.sdr ? (
                    <i className="fas fa-check-circle text-[#00FF00]"></i>
                  ) : (
                    <i className="fas fa-times-circle text-gray-400"></i>
                  )}
                </td>
                <td className="py-3 px-4">
                  {item.wifiHacking ? (
                    <i className="fas fa-check-circle text-[#00FF00]"></i>
                  ) : (
                    <i className="fas fa-times-circle text-gray-400"></i>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HardwareCompatibility;
