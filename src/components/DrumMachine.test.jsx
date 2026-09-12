import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import BassSwitch from './BassSwitch';
import DrumMachine from './DrumMachine';
import Metronome from './Metronome';

describe('BassSwitch', () => {
  it('toggles on and off when clicked', () => {
    const { container } = render(<BassSwitch name="bassSwitch" index={0} isActive={false} />);

    const label = container.querySelector('label');
    const checkbox = screen.getByRole('checkbox');

    expect(checkbox).not.toBeChecked();

    fireEvent.click(label);

    expect(checkbox).toBeChecked();
    expect(label).toHaveClass('on');
    expect(label).toHaveAttribute('id', 'bassSwitch-0');
  });
});

describe('Metronome', () => {
  it('updates the displayed BPM when the slider changes', () => {
    render(<Metronome />);

    fireEvent.change(screen.getByRole('slider'), {
      target: { value: '150' },
    });

    expect(screen.getByText('150 BPM')).toBeInTheDocument();
  });

  it('starts and stops the metronome', () => {
    render(<Metronome />);

    fireEvent.click(screen.getByRole('button', { name: 'Start' }));
    expect(screen.getByRole('button', { name: 'Stop' })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Stop' }));
    expect(screen.getByRole('button', { name: 'Start' })).toBeInTheDocument();
  });
});

describe('DrumMachine', () => {
  it('renders 16 steps for each row and toggles the play button state', async () => {
    render(<DrumMachine bassName="BASS" snareName="SNARE" hiHatName="HI HAT" />);

    expect(screen.getByText('BASS')).toBeInTheDocument();
    expect(screen.getByText('SNARE')).toBeInTheDocument();
    expect(screen.getByText('HI HAT')).toBeInTheDocument();
    expect(document.querySelectorAll('.switch-button')).toHaveLength(48);

    fireEvent.click(screen.getByRole('button', { name: 'Start' }));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Stop' })).toBeInTheDocument();
    });
  });
});
