import React from 'react';
import { motion } from 'framer-motion';
import Reveal from '../../motion/Reveal';
import { stagger, childFadeUp, lineGrow, EASE_EXPO } from '../../motion/variants';
import './Skills.css';

const skillRows = [
  {
    id: 'cad',
    category: 'CAD & Analysis',
    skills: ['SOLIDWORKS', 'SolidWorks Simulation', 'CREO', 'AutoCAD', 'ANSYS Fluent', 'XFLR5', 'FEA / CFD', 'GD&T'],
  },
  {
    id: 'ml',
    category: 'ML & Vision',
    skills: ['OpenCV', 'TensorFlow', 'PyTorch', 'YOLO', 'Stereo Vision', 'CNN / DNN', 'Visual Servoing', '3D Reconstruction'],
  },
  {
    id: 'mfg',
    category: 'Manufacturing',
    skills: ['CNC Milling', 'Laser Cutting', '3D Printing', 'Rapid Prototyping', 'DFM / DFMEA', 'Material Selection', 'BOM'],
  },
  {
    id: 'ctrl',
    category: 'Control & Robotics',
    skills: ['PID Control', 'Kinematics', 'ROS2 / RoboDK', 'SLAM / Sensor Fusion', 'Path Planning', 'UR5e', 'MuJoCo', 'Isaac Sim', 'Gazebo'],
  },
  {
    id: 'uav',
    category: 'Drone & UAV',
    skills: ['PX4 / Ardupilot', 'MAVSDK', 'MAVLink', 'DJI OSDK', 'Flight Control', 'Mission Planner', 'QGroundControl'],
  },
  {
    id: 'hw',
    category: 'Hardware',
    skills: ['Jetson AGX', 'Raspberry Pi', 'Arduino', 'LiDAR', 'RTK GPS', 'ToF Sensors', 'Stepper & Servo Motors', 'Pneumatics'],
  },
  {
    id: 'code',
    category: 'Code',
    skills: ['Python', 'C++', 'C', 'MATLAB', 'ROS2', 'Docker / Linux'],
  },
];

const certs = [
  'SOLIDWORKS Professional — Dassault Systèmes',
  'Machine Learning — UMN',
  'Robot Vision — UMN',
  'Feedback Control Systems — UMN',
  'Robotics & Principles — UMN',
  'Wearable Technology Design — UMN',
  'Deep Learning — UMN',
  'Physics Simulation for Robotics — UMN',
  'Computer Vision — UMN',
  'Kalman Filtering — UMN',
  'Advanced Control Systems — UMN',
];

const Skills: React.FC = () => (
  <section id="skills" className="section skills" data-section="skills">
    <div className="container">

      <Reveal>
        <div className="section-tag">
          <span className="tag-number text-mono">03</span>
          <span className="tag-label">Skills</span>
        </div>
      </Reveal>

      <Reveal delay={0.05}>
        <h2 className="section-title">
          Technical <span className="gradient-text">Expertise</span>
        </h2>
      </Reveal>

      <div className="skill-rows">
        {skillRows.map((row, ri) => (
          <div key={row.id} className="skill-row">
            {/* Rule that grows in */}
            <motion.div
              className="skill-rule"
              variants={lineGrow}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: ri * 0.04 }}
            />

            <div className="skill-row-inner">
              {/* Category heading */}
              <motion.h3
                className="skill-category text-mono"
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, ease: EASE_EXPO, delay: ri * 0.04 + 0.05 }}
              >
                {row.category}
              </motion.h3>

              {/* Skill tags */}
              <motion.div
                className="skill-tags"
                variants={stagger(0.05)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
              >
                {row.skills.map((s) => (
                  <motion.span key={s} className="skill-tag text-mono" variants={childFadeUp}>
                    {s}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </div>
        ))}
      </div>

      {/* Certifications marquee */}
      <div className="certs-section">
        <span className="certs-label text-mono">// courses &amp; certs</span>
        <div className="certs-track">
          <div className="certs-inner">
            {[...certs, ...certs].map((c, i) => (
              <span key={i} className="cert-pill">{c}</span>
            ))}
          </div>
        </div>
      </div>

    </div>
  </section>
);

export default Skills;
