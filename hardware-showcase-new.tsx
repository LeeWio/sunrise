function HardwareShowcase() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const hardware = [
    {
      id: 'macbook',
      name: 'MacBook Pro',
      fullName: 'MacBook Pro 14"',
      specs: ['M3 Pro', '36GB RAM', '1TB SSD'],
      usage: 'Main workstation for development and creative work',
      image: './m1-max.jpg',
      bgColor: 'from-slate-50 to-slate-100'
    },
    {
      id: 'iphone',
      name: 'iPhone 16 Pro',
      fullName: 'iPhone 16 Pro',
      specs: ['A18 Pro', '256GB', 'Desert Titanium'],
      usage: 'Mobile productivity and photography',
      image: './16pro.jpg',
      bgColor: 'from-blue-50 to-cyan-50'
    },
    {
      id: 'airpods',
      name: 'AirPods Pro',
      fullName: 'AirPods Pro 2',
      specs: ['H2 Chip', 'ANC', 'USB-C'],
      usage: 'Premium audio for focus and calls',
      image: './airpods-pro.jpg',
      bgColor: 'from-gray-50 to-gray-100'
    },
    {
      id: 'switch',
      name: 'Switch OLED',
      fullName: 'Nintendo Switch OLED',
      specs: ['7" OLED', '64GB', 'Enhanced Audio'],
      usage: 'Gaming entertainment on the go',
      image: './switch.jpg',
      bgColor: 'from-red-50 to-red-100'
    },
    {
      id: 'ps5',
      name: 'PlayStation 5',
      fullName: 'PlayStation 5',
      specs: ['825GB SSD', '4K/120fps', '3D Audio'],
      usage: 'Next-gen gaming and media entertainment',
      image: './ps5.jpg',
      bgColor: 'from-blue-50 to-indigo-50'
    }
  ];

  return (
    <motion.div
      ref={ref}
      animate={isInView ? "visible" : "hidden"}
      className="py-8 w-full"
      initial="hidden"
      variants={containerVariants}
    >
      {/* Full-Width Gallery Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-6 xl:grid-cols-6 gap-4 w-full">
        {/* Main Device - MacBook Pro */}
        <motion.div
          className="col-span-2 lg:col-span-4 row-span-2"
          variants={scaleInVariants}
        >
          <Card className="h-full bg-white border border-gray-200 shadow-sm overflow-hidden">
            <div className="flex flex-col h-full">
              {/* Image Section - No overlay */}
              <div className="h-48 lg:h-56 bg-gradient-to-br from-slate-50 to-slate-100">
                <img
                  alt="MacBook Pro"
                  className="w-full h-full object-cover object-center"
                  src={hardware[0].image}
                />
              </div>

              {/* Content Section */}
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold text-gray-900">{hardware[0].name}</h3>
                      <p className="text-sm text-gray-600">{hardware[0].fullName}</p>
                    </div>
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2">
                      {hardware[0].specs.map((spec, index) => (
                        <Chip
                          key={index}
                          size="sm"
                          variant="flat"
                          className="text-xs bg-gray-100 text-gray-700 border border-gray-200"
                        >
                          {spec}
                        </Chip>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-600 leading-relaxed">{hardware[0].usage}</p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Secondary Devices Grid */}
        <div className="col-span-2 lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
          {/* iPhone 16 Pro */}
          <motion.div variants={scaleInVariants}>
            <Card className="h-full bg-white border border-gray-200 shadow-sm overflow-hidden">
              <div className="h-32 bg-gradient-to-br from-blue-50 to-cyan-50">
                <img
                  alt="iPhone 16 Pro"
                  className="w-full h-full object-cover object-top"
                  src={hardware[1].image}
                />
              </div>
              <div className="p-4 space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900">{hardware[1].name}</h4>
                    <p className="text-xs text-gray-600 font-mono">{hardware[1].specs[0]}</p>
                  </div>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                </div>
                <p className="text-xs text-gray-600 line-clamp-2">{hardware[1].usage}</p>
              </div>
            </Card>
          </motion.div>

          {/* AirPods Pro */}
          <motion.div variants={scaleInVariants}>
            <Card className="h-full bg-white border border-gray-200 shadow-sm overflow-hidden">
              <div className="h-32 bg-gradient-to-br from-gray-50 to-gray-100">
                <img
                  alt="AirPods Pro"
                  className="w-full h-full object-cover object-center"
                  src={hardware[2].image}
                />
              </div>
              <div className="p-4 space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900">{hardware[2].name}</h4>
                    <p className="text-xs text-gray-600 font-mono">{hardware[2].specs[1]}</p>
                  </div>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                </div>
                <p className="text-xs text-gray-600 line-clamp-2">{hardware[2].usage}</p>
              </div>
            </Card>
          </motion.div>

          {/* Switch OLED */}
          <motion.div variants={scaleInVariants}>
            <Card className="h-full bg-white border border-gray-200 shadow-sm overflow-hidden">
              <div className="h-32 bg-gradient-to-br from-red-50 to-red-100">
                <img
                  alt="Nintendo Switch"
                  className="w-full h-full object-cover object-center"
                  src={hardware[3].image}
                />
              </div>
              <div className="p-4 space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900">{hardware[3].name}</h4>
                    <p className="text-xs text-gray-600 font-mono">{hardware[3].specs[0]}</p>
                  </div>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                </div>
                <p className="text-xs text-gray-600 line-clamp-2">{hardware[3].usage}</p>
              </div>
            </Card>
          </motion.div>

          {/* PS5 */}
          <motion.div variants={scaleInVariants}>
            <Card className="h-full bg-white border border-gray-200 shadow-sm overflow-hidden">
              <div className="h-32 bg-gradient-to-br from-blue-50 to-indigo-50">
                <img
                  alt="PlayStation 5"
                  className="w-full h-full object-cover object-center"
                  src={hardware[4].image}
                />
              </div>
              <div className="p-4 space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900">{hardware[4].name}</h4>
                    <p className="text-xs text-gray-600 font-mono">{hardware[4].specs[0]}</p>
                  </div>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                </div>
                <p className="text-xs text-gray-600 line-clamp-2">{hardware[4].usage}</p>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Full-Width Stats Bar */}
      <motion.div
        className="mt-8 w-full"
        variants={fadeInUpVariants}
      >
        <div className="w-full bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-lg p-4">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="font-medium">5 Active Devices</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-gray-300" />
            <div className="flex items-center gap-2">
              <span className="font-medium">Daily Workflow Optimized</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-gray-300" />
            <div className="flex items-center gap-2">
              <span className="font-medium">Productivity First Setup</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}