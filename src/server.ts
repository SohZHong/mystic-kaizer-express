import express, { Request, Response } from 'express';
import { createClient } from '@supabase/supabase-js';
import config from './config/config';
import { Database } from './supabase/database.types';
import { Event, EventField } from '@curvegrid/multibaas-sdk';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurations
const { port, supabaseUrl, supabaseAnonKey } = config;

// Initialize Supabase
const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Webhook Receiver
app.post('/webhook', async (req: Request, res: Response) => {
  try {
    const events: Event[] = req.body;

    for (const event of events) {
      if (event.event.name === 'EventCreated') {
        const inputs = event.event.inputs;

        // Extract necessary fields
        const eventId = inputs.find(
          (input: EventField) => input.name === 'eventId'
        )?.value;
        const organizer = inputs.find(
          (input: EventField) => input.name === 'organizer'
        )?.value;
        const eventContract = inputs.find(
          (input: EventField) => input.name === 'eventContract'
        )?.value;
        const name = inputs.find(
          (input: EventField) => input.name === 'name'
        )?.value;
        const description = inputs.find(
          (input: EventField) => input.name === 'description'
        )?.value;
        const location = inputs.find(
          (input: EventField) => input.name === 'location'
        )?.value;
        const baseUri = inputs.find(
          (input: EventField) => input.name === 'baseUri'
        )?.value;
        const participantLimit = inputs.find(
          (input: EventField) => input.name === 'participantLimit'
        )?.value;
        const startDate = inputs.find(
          (input: EventField) => input.name === 'startDate'
        )?.value;
        const rewardCount = inputs.find(
          (input: EventField) => input.name === 'rewardCount'
        )?.value;

        if (!eventId || !organizer || !eventContract) {
          console.warn('Missing fields in EventCreated webhook:', inputs);
          continue;
        }

        // Save to Supabase
        const { data, error } = await supabase.from('events').insert([
          {
            event_id: eventId,
            organizer,
            address: eventContract,
            name,
            description,
            location,
            participant_limit: Number(participantLimit),
            reward_count: Number(rewardCount),
            start_date: new Date(startDate * 1000).toISOString(),
          },
        ]);

        //

        if (error) {
          console.error('Error inserting into Supabase:', error);
        } else {
          console.log('Successfully saved event:', data);
        }
      }
    }

    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Error processing webhook:', err);
    res.status(500).json({ success: false, error: (err as Error).message });
  }
});

// Start Server
app.listen(port, () => console.log(`Server running on port ${port}`));
