'use client'

import { Avatar, Card, CardBody, CardHeader, Chip, Button } from '@heroui/react'
import { motion } from 'framer-motion'
import { GithubIcon, TwitterIcon, MailIcon, MapPinIcon } from '../icons'
import { siteConfig } from '@/config/site'

export function AboutSection() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <Card className="inline-block">
            <CardBody className="p-10 md:p-12">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  About the Author
                </span>
              </h2>
              <p className="text-xl text-default-700 max-w-3xl leading-relaxed">
                Learn more about me and my technical background
              </p>
            </CardBody>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="shadow-lg">
              <CardBody className="p-8">
                <div className="flex flex-col items-center gap-6">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Avatar
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
                      alt={siteConfig.author.name}
                      className="w-32 h-32"
                      size="lg"
                    />
                  </motion.div>

                  <div className="text-center">
                    <h3 className="text-3xl font-bold mb-3">
                      <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                        {siteConfig.author.name}
                      </span>
                    </h3>
                    <Chip color="primary" variant="flat" className="mb-4">
                      Full-Stack Developer
                    </Chip>
                  </div>

                  <div className="text-center space-y-6 mt-8">
                    <p className="text-default-700 leading-relaxed">
                      Passionate about technology, focused on building high-performance, user-friendly web applications.
                      Continuously learning new technologies and sharing development insights.
                    </p>

                    <Chip color="default" variant="flat" startContent={<MapPinIcon size={16} />}>
                      Beijing
                    </Chip>

                    <div className="flex justify-center gap-6 pt-4">
                      {[
                        { icon: GithubIcon, href: "https://github.com" },
                        { icon: TwitterIcon, href: "https://twitter.com" },
                        { icon: MailIcon, href: "mailto:contact@example.com" }
                      ].map((social, index) => (
                        <motion.div
                          key={index}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Button
                            as="a"
                            href={social.href}
                            target={social.href.startsWith('http') ? "_blank" : undefined}
                            rel={social.href.startsWith('http') ? "noopener noreferrer" : undefined}
                            isIconOnly
                            variant="light"
                          >
                            <social.icon size={24} />
                          </Button>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <Card className="shadow-lg">
              <CardHeader>
                <h4 className="text-xl font-semibold">Tech Stack</h4>
              </CardHeader>
              <CardBody>
                <div className="flex flex-wrap gap-2">
                  {[
                    'JavaScript', 'TypeScript', 'React', 'Vue',
                    'Node.js', 'Python', 'Docker', 'AWS'
                  ].map((skill, index) => (
                    <Chip
                      key={index}
                      variant="flat"
                      size="sm"
                    >
                      {skill}
                    </Chip>
                  ))}
                </div>
              </CardBody>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <h4 className="text-xl font-semibold">Areas of Interest</h4>
              </CardHeader>
              <CardBody>
                <div className="space-y-3">
                  {[
                    'Frontend Development & UX Design',
                    'Open Source Contributions',
                    'Technical Writing & Knowledge Sharing',
                    'Cloud Native & DevOps Practices'
                  ].map((interest, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-default-700">{interest}</span>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <h4 className="text-xl font-semibold">Blog Statistics</h4>
              </CardHeader>
              <CardBody>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-default-100 rounded-xl p-4">
                    <div className="text-2xl font-bold text-primary">50+</div>
                    <div className="text-sm text-default-500 mt-1">Total Articles</div>
                  </div>
                  <div className="bg-default-100 rounded-xl p-4">
                    <div className="text-2xl font-bold text-secondary">100k+</div>
                    <div className="text-sm text-default-500 mt-1">Total Views</div>
                  </div>
                  <div className="bg-default-100 rounded-xl p-4">
                    <div className="text-2xl font-bold text-success">1k+</div>
                    <div className="text-sm text-default-500 mt-1">Followers</div>
                  </div>
                  <div className="bg-default-100 rounded-xl p-4">
                    <div className="text-2xl font-bold text-warning">500+</div>
                    <div className="text-sm text-default-500 mt-1">Comments</div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}