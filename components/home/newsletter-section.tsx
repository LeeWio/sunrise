'use client'

import { Button, Card, CardBody, CardHeader, Chip, Input } from '@heroui/react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { MailIcon, SendIcon } from '../icons'

export function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Subscribing:', email)
    setIsSubscribed(true)
    setEmail('')
    setTimeout(() => setIsSubscribed(false), 3000)
  }

  return (
    <section className="py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Card className="shadow-xl">
            <CardBody className="p-12 md:p-16">
              <div className="text-center mb-12">
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Subscribe to Blog Updates
                  </span>
                </h2>
                <p className="text-xl text-default-700 max-w-3xl leading-relaxed">
                  Get the latest article updates, technical insights, and exclusive content.
                  Weekly selections delivered directly to your inbox, grow with millions of developers.
                </p>
              </div>

              <form onSubmit={handleSubscribe} className="max-w-2xl mx-auto mb-12">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    startContent={<MailIcon size={20} />}
                    className="flex-1"
                    size="lg"
                    required
                  />
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      type="submit"
                      size="lg"
                      color="primary"
                      className="font-semibold px-8 py-4"
                    >
                      <div className="flex items-center gap-2">
                        <SendIcon size={18} />
                        <span>Subscribe</span>
                      </div>
                    </Button>
                  </motion.div>
                </div>
              </form>

              {isSubscribed && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center mt-6"
                >
                  <Chip color="success" variant="flat" size="lg">
                    Successfully subscribed! Thank you for your support 🎉
                  </Chip>
                </motion.div>
              )}

              <div className="flex flex-wrap justify-center gap-6">
                {[
                  { text: "Ad-Free", icon: "✨" },
                  { text: "High Quality Content", icon: "🚀" },
                  { text: "Unsubscribe Anytime", icon: "⚡" },
                  { text: "Exclusive Resources", icon: "🎁" }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Chip variant="flat">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{feature.icon}</span>
                        <span>{feature.text}</span>
                      </div>
                    </Chip>
                  </motion.div>
                ))}
              </div>
            </CardBody>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}